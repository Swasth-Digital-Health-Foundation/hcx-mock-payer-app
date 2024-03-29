import { lowerCase } from "lodash";


export function replaceString(str: string, numberOfChar: any, charToReplace: any) {
    return str.substring(0, numberOfChar).split("").map((ele: any) => ele = charToReplace).join("").concat(str.substring(numberOfChar, str.length))
}

export function maskEmailAddress(emailAddress: string) {
    if(emailAddress) {
        var id = emailAddress.substring(0, emailAddress.lastIndexOf("@"));
        var domain = emailAddress.substring(emailAddress.lastIndexOf("@"));
        if (id.length <= 1) {
            return emailAddress;
        }
        switch (id.length) {
            case 2:
                id = id.substring(0, 1) + "*";
                break;
            case 3:
                id = id.substring(0, 1) + "*" + id.substring(2);
                break;
            case 4:
                id = id.substring(0, 1) + "**" + id.substring(3);
                break;
            default:
                var masks = Array(id.length - 4 + 1).join("*");
                id = id.substring(0, 2) + masks + id.substring(id.length - 2);
                break;
        }
    
        domain = maskDomain(domain);
    
        var address = id + domain;
        return address;
    }

}

export function maskDomain(domain: string) {
    const domainLength = domain.length;
    if (domainLength > 2) {
        domain = domain.substring(0, 3);
        for (var i = 0; i < domainLength; i++) {
            domain = domain + "*";
        }
    }
    return domain;
}


export const colorPicker = (text:string) => {
    switch(lowerCase(text)) {
      case "success" :  return "text-success";
      case "accept" :  return "text-success";
      case "danger" : return "text-danger";
      case "neutral" : return "text-warning";
      case "noraml" : return "text-warning";
      case "approved" : return "text-meta-3";
      case "rejected" : return "text-red";
      case "reject" : return "text-red";
      case "pending" : return "text-meta-6";
      default : return "text-meta-5"
    }
  }

  export const bgcolorPicker = (text:string) => {
    switch(lowerCase(text)){
      case "success" :  return "bg-success";
      case "accept" :  return "bg-success";
      case "danger" : return "bg-danger";
      case "neutral" : return "bg-warning";
      case "normal" : return "bg-warning";
      case "approved" : return "bg-meta-3";
      case "rejected" : return "bg-red";
      case "reject" : return "bg-red";
      case "pending" : return "bg-meta-6";
      default : return "bg-meta-5"
    }
  }
