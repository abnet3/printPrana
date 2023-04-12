import { Component, ElementRef, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    <button (click)="downloadPDF()">Download PDF</button>
    <button (click)="printPdf()">Send PDF</button>
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
  firstName = 'John';
  lastName = 'Doe';
  constructor(private http: HttpClient) {}
  @ViewChild('box') box!: ElementRef;
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
        formData.append('pdf', pdfBlob, 'ethiopia.pdf');
        this.http.post('https://example.com/api/pdf', formData).subscribe(
          response => console.log('PDF sent successfully'),
          error => console.log('Error sending PDF:', error)
        );
      });
    } else {
      console.log('Error: element not found');
    }
  }
  sendPDF() {
    const element = document.getElementById('table');
    if (element) {
      html2canvas(element, {useCORS: true}).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        const pdfBlob = pdf.output('blob');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'ethiopia.pdf');
        this.http.post('https://localhost:7031/printing/print', formData).subscribe(
          response => console.log('PDF sent successfully'),
          error => console.log('Error sending PDF:', error)
        );
      });
    } else {
      console.log('Error: element not found');
    }
  }
}
