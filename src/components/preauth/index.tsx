import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { listRequest } from "../../api/api";
import { navigate } from "raviger";
import {
  IAdditionalInfo,
  Item,
  parseAdditionalInfo,
  currencyObjToString,
} from "../claims";
import Loading from "../common/Loading";
import { unbundleAs } from "../../utils/fhirUtils";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { classNames } from "../common/AppLayout";

type PreAuthDetail = {
  id: string;
  request_id: string;
  request_no: string;
  name: string;
  gender: string;
  provider: string;
  items: Item[];
  insurance_no: string;
  requested_amount: string;
  approved_amount: string;
  status: string;
  medical_info: IAdditionalInfo;
  financial_info: IAdditionalInfo;
  resources: {
    patient: object;
    coverage: object;
    claim: object;
  };
  address: any;
};

export function preAuthMapper(preauth: any): PreAuthDetail {
  const { identifier } = preauth.payload;

  const resources = {
    patient: unbundleAs(preauth.payload, "Patient").resource,
    coverage: unbundleAs(preauth.payload, "Coverage").resource,
    claim: unbundleAs(preauth.payload, "Claim").resource,
  };

  const items = resources.claim.item as Item[];
  console.log(items);
  const requested_amount = currencyObjToString(
    resources.claim.total ?? {
      currency: "INR",
      value: items?.map((i) => i.unitPrice.value).reduce((a, b) => a + b) || 0,
    }
  );

  return {
    id: preauth.request_id,
    request_id: preauth.request_id,
    request_no: identifier.value,
    name: resources.patient.name[0].text,
    gender: resources.patient.gender,
    provider: resources.claim.provider.name,
    address: resources.patient.address,
    items,
    insurance_no: resources.coverage.subscriberId,
    requested_amount,
    ...parseAdditionalInfo(preauth.additional_info),
    ...(preauth.status === "Pending" && { approved_amount: "-" }),
    status: preauth.status,
    resources,
  };
}

export default function PreAuths() {
  const [preauths, setPreauths] = useState<PreAuthDetail[]>();

  async function getPreAuths() {
    setPreauths(undefined);
    const res: any = await listRequest({ type: "preauth" });
    setPreauths(res.preauth.map(preAuthMapper));
  }

  useEffect(() => {
    getPreAuths();
  }, []);

  return (
    <>
      <Table
        title="Pre Auth"
        action={getPreAuths}
        actionIcon={
          <ArrowPathIcon
            className={classNames(
              "h-5 w-5 flex-shrink-0 text-white",
              !preauths && "animate-spin"
            )}
            aria-hidden="true"
          />
        }
        headers={[
          "request_no",
          "patient_name",
          "insurance_no",
          "approved_amount",
          "requested_amount",
          "expiry",
          "provider",
          "status",
        ]}
        onRowClick={(id) => navigate(`/preauths/${id}`)}
        data={
          (preauths || []).map((preauth) => ({
            ...preauth,
            request_no: preauth.request_no.slice(-8),
            patient_name: preauth.name,
          })) as any
        }
        primaryColumnIndex={1}
      />
      {!preauths && <Loading />}
    </>
  );
}
