import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Invoice, fetchUserInvoices } from "../features/user-invoices";
import { InvoiceDialog } from "./InvoiceDialog";

export const InvoicesTable = () => {
    const invoices = useAppSelector((state) => state.userInvoices.invoices);
    const dispatch = useAppDispatch();

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined | null>(null);
    const invoiceDialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dispatch(fetchUserInvoices());
    }, []);

    const columns = [
        {
            name: 'Date',
            selector: 'created_at',
            selectable: true,
        },
        {
            name: 'Payee',
            selector: 'vendor_name',
        },
        {
            name: 'Description',
            selector: 'description',
        },
        {
            name: 'Due date',
            selector: 'due_date',
        },
        {
            name: 'Amount',
            selector: 'amount',
        },
        {
            name: 'Status',
            selector: 'paid',
        },
        {
            name: '',
            selector: 'view'
        }
    ]

    const checkBoxClassName = "mr-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";

    return (
        <div className="overflow-y-scroll h-5/6 rounded-t-2xl">
            <InvoiceDialog ref={invoiceDialogRef} invoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} />
            <table className="table h-full border-collapse border-2 border-white">
                <thead className="bg-primary-600 text-white text-lg">
                    <tr>
                        {columns.map((column, index) => {
                            if (column.selectable) {
                                return <th key={index} className="border-r-2 border-b-2 border-slate-200"><input type="checkbox" className={checkBoxClassName} />{column.name}</th>
                            }
                            return <th key={index} className="border-r-2 border-b-2 border-slate-200">{column.name}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => {
                        return (
                            <tr key={index} className="hover:bg-primary-200 hover:text-black">
                                {columns.map((column, index) => {
                                    const {
                                        due_date,
                                        created_at,
                                        paid
                                    } = invoice;

                                    if (column.selector === 'paid') {
                                        return <td key={index} className="border-b-2 border-slate-200">{paid ? 'Paid' : 'Unpaid'}</td>
                                    }

                                    if (column.selectable) {
                                        if (column.selector === 'created_at') {
                                            const day = new Date(created_at).getDate();
                                            const month = new Date(created_at).getMonth();
                                            const year = new Date(created_at).getFullYear();
                                            return <td key={index} className="border-b-2 border-slate-200"><input type="checkbox" className={checkBoxClassName} />{day}/{month}/{year}</td>
                                        }
                                        return <td key={index} className="border-b-2 border-slate-200"><input type="checkbox" className={checkBoxClassName} />{invoice[column.selector]}</td>
                                    }

                                    if (column.selector === 'due_date') {
                                        const day = new Date(due_date).getDate();
                                        const month = new Date(due_date).getMonth();
                                        const year = new Date(due_date).getFullYear();
                                        return <td key={index} className="border-b-2 border-slate-200">{day}/{month}/{year}</td>
                                    }

                                    if (column.selector === 'view') {
                                        return <td key={index} className="border-b-2 border-slate-200"><button className="btn bg-primary-500 hover:bg-primary-700 text-white btn-xs" onClick={() => {
                                            setSelectedInvoice(invoice);
                                            invoiceDialogRef.current?.showModal();
                                        }}>View</button></td>
                                    }

                                    return <td key={index} className="border-b-2 border-slate-200">{invoice[column.selector]}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
