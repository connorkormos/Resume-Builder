import { useReactToPrint } from 'react-to-print';

const pageStyle = `
      @page {
         size: letter portrait;
         margin: 0;
      }

      @media print {
         html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0;
            padding: 0;
         }

         body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
         }
      }
   `;

export function usePrintResume(resume, resumeRef) {
   return useReactToPrint({
      documentTitle: resume.title,
      contentRef: resumeRef,
      pageStyle: pageStyle,
   });
}