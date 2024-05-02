import React, { useEffect } from "react"
import { Invoice } from "../features/user-invoices"

interface InvoiceDialogProps {
    invoiceId?: number;
    invoice: Invoice | null | undefined;
    setSelectedInvoice: (invoice: Invoice | null | undefined) => void;
}

export const InvoiceDialog: React.FC<InvoiceDialogProps> = React.forwardRef<any, InvoiceDialogProps>(({ invoice }, ref) => {
    const [invoiceDate, setInvoiceDate] = React.useState<string>('');
    const [dueDate, setInvoiceDueDate] = React.useState<string>('');

    const convertDate = (date: string) => {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDate();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        if (invoice) {
            setInvoiceDate(convertDate(invoice.created_at));
            setInvoiceDueDate(convertDate(invoice.due_date));
        }
    }, [invoice]);

    return (<>
        <dialog id="my_modal_4" className="modal" ref={ref}>
            <div className="modal-box w-11/12 max-w-5xl">
                {invoice === null && <div>Loading...</div>}
                {invoice && (<><h3 className="font-bold text-lg">Invoie ID: {invoice.id} - {invoiceDate}</h3>
                    <div className="py-4">Description: {invoice.description}</div>
                    <div>Amount: ${invoice.amount}</div>
                    <div>Payee: {invoice.vendor_name}</div>
                    <div>Due date: {dueDate}</div>
                    <div>Status: {invoice.paid ? 'Paid' : 'Unpaid'}</div></>)}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>)
});
