import { Component, ElementRef, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Question {
  questionString: string;
  questionOptions: string[];
}



@Component({
  selector: 'app-root',
  template: `
    <div class="container" id="table">
      <div class="box"  #box>
        <div class="badge">
          <div class="header">
            <img
              src="https://res.cloudinary.com/prana-events/image/upload/v1644302216/Prana%20Logos/Prana_Logo-05_ky2jvy.png"
              alt="Logo"
            />
            <div class="info">
              <div class="date">Date: 01/01/2023</div>
              <div class="location">Location: Addis Ababa</div>
            </div>
          </div>
          <div class="content">
          <div class="name">{{ firstName }} {{ lastName }}</div>
            <div class="company">Prana Events</div>
            <div class="country">Ethiopia</div>
            <img
              class="qr-code"
              src="https://api.qrserver.com/v1/create-qr-code/?data=Sample%20QR%20code%20data&amp;size=100x100&amp;color=000000&amp;bgcolor=FFFFFF&amp;qzone=1"
            />
          </div>
          <div class="footer">
            <h2>Visitor</h2>
          </div>
        </div>
      </div>
      <div class="boximage">
        <img src="https://res.cloudinary.com/prana-events/image/upload/v1680701154/3_itlvov.png">
      </div>
      <div class="boximage">
        <img src="https://res.cloudinary.com/prana-events/image/upload/v1680701188/1_iz5faf.png">
      </div>
      <div class="boximage">
        <img src="https://res.cloudinary.com/prana-events/image/upload/v1680701189/2_giat3m.png">
      </div>
    </div>

    <div class="row">

    </div>
    <textarea [(ngModel)]="jsonString" (ngModelChange)="onJsonChange()"></textarea>
    <button (click)="downloadPDF()">Download PDF</button>
    <button (click)="printPdf()">Send PDF</button>
    <button (click)="printoBrowser()">Browser Print</button>
    <button (click)="changeJson()">Change Json</button>
    <button (click)="onSubmit()">Submit</button>


  `,
  styles: [`
    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, calc(100vh / 2 - 20px));
      gap: 5px;
    }
    .box {
      background-color: #F2F2F2;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .boximage {
      width: 100%;
      height: 100%;
    }
    .boximage img {
      width: 100%;
      height: 100%;
    }
    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 1fr);
      }
      .box {
        font-size: 18px;
      }
    }
    .badge {
      display: inline-block;
      font-family: Arial, sans-serif;
      width: 100%;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #020202;
      padding: 10px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .header img {
      width: 100px;
      height: 100px;
      padding-left: 25px;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 25px;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 20px;
    }
    .name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .company,
    .country {
      font-size: 18px;
      margin-bottom: 5px;
    }
    .country {
      font-style: italic;
    }
    .date,
    .location {
      font-size: 18px;
    }
    .location {
      margin-top: 5px;
    }
    .qr-code {
      margin-top: 20px;
    }
    .footer {
      background-color: #2196F3;
      text-align: center;
      padding: 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .footer h2 {
      font-size: 36px;
      color: #fff;
      margin: 0;
    }
    /* @media print {
      body {
        margin: -10px;
        padding: -10px;
      }
      .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, calc(100vh / 2 - 20px));
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #4CAF50;
        color: #fff;
        padding: 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .header img {
        width: 80px;
        height: 80px;
        padding-left: 25px;
      }
      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 25px;
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 20px;
      }
      .name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .company,
      .country {
        font-size: 18px;
        margin-bottom: 5px;
      }
      .country {
        font-style: italic;
      }
      .date,
      .location {
        font-size: 18px;
      }
      .location {
        margin-top: 5px;
      }
      .qr-code {
        margin-top: 20px;
      }
      .footer {
        background-color: #2196F3;
        text-align: center;
        padding: 20px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      .footer h2 {
        font-size: 36px;
        color: #fff;
        margin: 0;
      }
    } */
    @media print {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, calc(50vh - 20px));
    width: 420mm;
    height: 594mm;
    margin-left: 50px;
  }
  .boximage {
    display: none;
  }
  .box:nth-child(n+3) {
    display: none;
  }
  body {
          width: 100%;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #4CAF50;
          color: #fff;
          padding: 10px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .header img {
          width: 80px;
          height: 80px;
          padding-left: 251px;
        }
        .info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 125px;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding-left: 251px;
          padding-right: 125px;
          margin-top: 50px;
        }
        .name {
          font-size: 56px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .company,
        .country {
          margin-top: 25px;
          font-size: 42px;
          margin-bottom: 5px;
        }
        .country {
          font-style: italic;
        }
        .date,
        .location {
          font-size: 24px;
        }
        .location {
          margin-top: 5px;
        }
        .qr-code {
          margin-top: 30px;
          height: 150px;
          width: 150px;
        }
        .footer {
          background-color: #000000;
          text-align: center;
          margin-top: 100px;
          padding-left: 251px;
          padding-right: 125px;
               border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .footer h2 {
          font-size: 36px;
          color: #FFFFFF;
          margin: 0;
        }
        }
  `]
})
export class AppComponent {
  // firstName = 'John';
  // lastName = 'Doe';
  jsonString!: string;
  firstName!: string;
  lastName!: string;
  json =
    {
      "formName": "Form1",
      "value": {
        "display": "wizard",
        "components": [
          {
            "title": "Page 1",
            "label": "Page 1",
            "type": "panel",
            "key": "page1",
            "components": [
              {
                "label": "Full name",
                "tableView": true,
                "key": "textField",
                "type": "textfield",
                "input": true
              },
              {
                "label": "Email",
                "tableView": true,
                "key": "email",
                "type": "email",
                "input": true
              },
              {
                "label": "Select Sessions",
                "widget": "choicesjs",
                "tableView": true,
                "data": {
                  "values": [
                    {
                      "label": "session one",
                      "value": "sessionOne"
                    },
                    {
                      "label": "session two",
                      "value": "sessionTwo"
                    },
                    {
                      "label": "session threee",
                      "value": "sessionThreee"
                    }
                  ]
                },
                "key": "selectSessions",
                "type": "select",
                "input": true
              },
              {
                "label": "Phone Number",
                "tableView": true,
                "key": "phoneNumber",
                "type": "phoneNumber",
                "input": true
              },
              {
                "label": "Survey",
                "tableView": false,
                "questions": [
                  {
                    "label": "rate us",
                    "value": "rateUs",
                    "tooltip": ""
                  }
                ],
                "values": [
                  {
                    "label": "good",
                    "value": "good",
                    "tooltip": ""
                  },
                  {
                    "label": "bad",
                    "value": "bad",
                    "tooltip": ""
                  },
                  {
                    "label": "worst",
                    "value": "worst",
                    "tooltip": ""
                  }
                ],
                "key": "survey1",
                "type": "survey",
                "input": true
              },
              {
                "label": "Text Area",
                "autoExpand": false,
                "tableView": true,
                "key": "textArea",
                "type": "textarea",
                "input": true
              },
              {
                "label": "Business",
                "optionsLabelPosition": "right",
                "tableView": false,
                "values": [
                  {
                    "label": "importer",
                    "value": "importer",
                    "shortcut": ""
                  },
                  {
                    "label": "exporter",
                    "value": "exporter",
                    "shortcut": ""
                  }
                ],
                "key": "business",
                "type": "selectboxes",
                "input": true,
                "inputType": "checkbox"
              }
            ],
            "input": false,
            "tableView": false
          },
          {
            "title": "Page 2",
            "label": "Page 2",
            "type": "panel",
            "key": "page2",
            "components": [
              {
                "label": "Date / Time",
                "tableView": false,
                "datePicker": {
                  "disableWeekends": false,
                  "disableWeekdays": false
                },
                "enableMinDateInput": false,
                "enableMaxDateInput": false,
                "key": "dateTime",
                "type": "datetime",
                "input": true,
                "widget": {
                  "type": "calendar",
                  "displayInTimezone": "viewer",
                  "locale": "en",
                  "useLocaleSettings": false,
                  "allowInput": true,
                  "mode": "single",
                  "enableTime": true,
                  "noCalendar": false,
                  "format": "yyyy-MM-dd hh:mm a",
                  "hourIncrement": 1,
                  "minuteIncrement": 1,
                  "time_24hr": false,
                  "minDate": null,
                  "disableWeekends": false,
                  "disableWeekdays": false,
                  "maxDate": null
                }
              }
            ],
            "input": false,
            "tableView": false
          }
        ]
      }
    };
  @ViewChild('box') box!: ElementRef;

  constructor(private http: HttpClient) { }


  downloadPDF() {
    const element = this.box.nativeElement;
    if (element) {
      html2canvas(element, {
        useCORS: true,
        scale: 2, // Increase the scale to improve the quality
        windowWidth: element.offsetWidth, // Set the canvas size to match the element size
        windowHeight: element.offsetHeight,
        scrollX: 0, // Disable scrolling
        scrollY: 0,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Use A4 paper size
        pdf.save('ethiopia.pdf');
      });
    } else {
      console.log('Error: element not found');
    }
  }

  printPdf() {
    const element = this.box.nativeElement;
    if (element) {
      html2canvas(element, {
        useCORS: true,
        scale: 2, // Increase the scale to improve the quality
        windowWidth: element.offsetWidth, // Set the canvas size to match the element size
        windowHeight: element.offsetHeight,
        scrollX: 0, // Disable scrolling
        scrollY: 0,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        const pdfBlob = pdf.output('blob');
        const formData = new FormData();
        formData.append('documentFile', pdfBlob, 'ethiopia.pdf');
        this.http.post('https://localhost:7031/printing/print', formData).subscribe(
          response => console.log('PDF sent successfully'),
          error => console.log('Error sending PDF:', error)
        );
      });
    } else {
      console.log('Error: element not found');
    }
  }

  printoBrowser() {
    const element = this.box.nativeElement;
    if (element) {
      html2canvas(element, {
        useCORS: true,
        scale: 2, // Increase the scale to improve the quality
        windowWidth: element.offsetWidth, // Set the canvas size to match the element size
        windowHeight: element.offsetHeight,
        scrollX: 0, // Disable scrolling
        scrollY: 0,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        const blobUrl = URL.createObjectURL(pdf.output('blob'));
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        iframe.addEventListener('load', () => {
          if (iframe.contentWindow) {
            iframe.contentWindow.print();
          }
          setTimeout(() => {
            document.body.removeChild(iframe);
            URL.revokeObjectURL(blobUrl);
          }, 3000); // Wait for the print job to complete before removing the iframe
        });
        document.body.appendChild(iframe);
      });
    } else {
      console.log('Error: element not found');
    }
  }



  transformedJson: Question[] = [];


  changeJson() {
    for (let page of this.json.value.components) {
      for (const component of page.components) {
        // if (component.type === 'textfield') {
        //   this.transformedJson.push({
        //     questionString: component.label,
        //     questionOptions: ['No Option']

        //   });

        // }
        // else if (component.type === 'select') {
        //   //@ts-ignore
        //   const options = component.data.values.map(value => value.label);
        //   this.transformedJson.push({
        //     questionString: component.label,
        //     questionOptions: options
        //   });
        // } else if (component.type === 'selectboxes') {
        //           //@ts-ignore
        //   const options = component.values.map(value => value.label);
        //   this.transformedJson.push({
        //     questionString: component.label,
        //     questionOptions: options
        //   });
        // }

        // else if

        // (component.type !== 'textfield') {
        //   this.transformedJson.push({
        //     questionString: component.label,
        //     questionOptions: ['No Option']

        //   });
        // }


        // the above works too but this is better


        switch (component.type) {
          case 'select': {
            //@ts-ignore
            const options = component.data.values.map(value => value.label);
            this.transformedJson.push({
              questionString: component.label,
              questionOptions: options
            });
            break;
          }
          case 'selectboxes': {
            //@ts-ignore
            const options = component.values.map(value => value.label);
            this.transformedJson.push({
              questionString: component.label,
              questionOptions: options
            });
            break;
          }
          default: {
            this.transformedJson.push({
              questionString: component.label,
              questionOptions: ['No Option']
            });
            break;
          }
        }

      }
    }

    console.log(this.json);
    console.log(this.transformedJson);
  }


  onJsonChange() {
    try {
      const jsonObject = JSON.parse(this.jsonString);
      if (this.isJsonValid(jsonObject)) {
        this.onSubmit();
      }
    } catch (e) {

      console.log("Invalid Scan please try again");
      // JSON is not yet fully pasted or is invalid
    }
  }

  isJsonValid(jsonObject: any): boolean {
    // Check if jsonObject has the expected structure and properties
    if (jsonObject.firstName && jsonObject.lastName) {
      return true;
    } else {
      return false;
    }
  }


  onSubmit() {
    const jsonObject = JSON.parse(this.jsonString);
    this.firstName = jsonObject.firstName;
    this.lastName = jsonObject.lastName;
    this.printPdf();
    console.log(jsonObject)
  }
}
