export class PopUpConfirm {
    title?: string;
    content?: string;
    buttonClose?: string;
    buttonAcepted?: string;

    constructor(data?: PopUpConfirm) {
        if (data) {
            this.title = data.title;
            this.content = data.content;
            this.buttonClose = data.buttonClose;
            this.buttonAcepted = data.buttonAcepted;
        }
    }

}

export class PopUpAlert {
    title?: string;
    content?: string;
    closeButtonLabel?: string;
  
    constructor(data?: PopUpAlert) {
      if (data) {
        this.title = data.title;
        this.content = data.content;
        this.closeButtonLabel = data.closeButtonLabel;
      }
    }
  }