class SStorage {
     getVCardByEmailAddress(email: string): VCard {
        console.log('VCardByEmailAddress: ');
         return new VCard();
     }
     getRecipientsForEmail(emailId: number): Recepient {
         console.log('RecipientsForEmail: '+ emailId);
         return new Recepient();
     }
}

class SStorageProxy extends SStorage{
    private storage: SStorage;
    private vcardCash;
    private recepientCash;
    constructor(storage: SStorage) {
        super();
        this.storage = storage;
        this.vcardCash = new Map();
        this.recepientCash = new Map();
    }

    getRecipientsForEmail(emailId: number): Recepient {
        if (!this.recepientCash.has(emailId)) {
            return new Recepient();
        }
        return this.recepientCash.get(emailId)
    };
    getVCardByEmailAddress (email: string): VCard {
        if (!this.vcardCash.has(email)) {
            return new VCard();
        }
        return this.vcardCash.get(email)
    };
}

class VCard {
    getTitle
    getName
}

class Recepient {
    getEmailAddr
    setVcard
}

class EmailForm {
    private recipients: Recepient[];
    private storage: SStorage;
    constructor(recipients: Recepient[], storage: SStorage) {
        this.recipients = recipients;
        this.storage = storage;
    }
    showTooltipe(d)
    showTooltipee() {
        let recp: Recepient = this.getRecepientUnderMousePointer();
        if (recp !==null) {
            let vc = this.storage.getVCardByEmailAddress(recp.getEmailAddr());
            recp.setVcard(vc);
            this.showTooltipe(vc.getTitle() + " " + vc.getName());
        }
    }
    getRecepientUnderMousePointer(): Recepient {
        return  new Recepient();
    }
}