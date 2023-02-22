import { ClaimDetail } from ".";
import StatusChip from "../common/StatusChip";
import Table from "../common/Table";
import { RejectApproveHandlers } from "./ClaimDetails";
import SupportingFiles from "./SupportingFiles";

export default function MedicalInfo({
  claim,
  ...props
}: { claim: ClaimDetail }) {
  const status = claim.medical_info.status;
  const supportingFiles = (claim as any).resources.claim.supportingInfo;
  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <h1 className="font-bold">
          Diagnosis
        </h1>
        {claim.diagnosis && claim.diagnosis.length > 0 && (
          <Table
            title=""
            headers={["display", "code", "text"]}
            data={claim.diagnosis.map((item) => ({
              id: item.diagnosisCodeableConcept.coding[0].code,
              display: item.type[0].coding[0].display,
              code: item.diagnosisCodeableConcept.coding[0].code,
              text: item.diagnosisCodeableConcept.text,
            }))}
          />
        )}
        <h1 className="font-bold mt-6">
          Procedures
        </h1>
        {/* using bill items temporarily */}
        {claim.items && claim.items.length > 0 && (
          <Table
            title=""
            headers={["display", "code", "value"]}
            data={claim.items.map((item: any) => ({
              id: item.productOrService.coding[0].code,
              display: item.productOrService.coding[0].display,
              code: item.productOrService.coding[0].code,
              value: `${item.unitPrice.value} ${item.unitPrice.currency}`,
            }))}
          />
        )}
      </div>
      <dl className="mt-8 rounded-lg bg-white p-6">
        <div className="text-gray-500 text-base font-bold pb-4">
          Supporting Files
        </div>
        <SupportingFiles supportingFiles={supportingFiles} />
      </dl>
    </>
  );
}