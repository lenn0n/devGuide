#### Usage

    import { useEffect } from 'react'
    import useTable from '@/app/hooks/useTable';
    
    const Page = () => {
    
      const {
        setTableHeader,
        setTableData,
        setTablePagination,
        setTablePayload,
        setTableDataRetriever,
        RenderTable
      } = useTable({ 
        showPagination: true,
        placeholderCount: 4
       })
    
      const getPayments = async (tablePayload: any) => {
        const response = await get({
          url: "/payment",
          payload: tablePayload,
          objectPayloadToURLParams: true,
          requiresAuth: true,
          authPrefix: 'Bearer'
        })
    
        if (response.result) {
          const tableData: any = []
          response.data.map((payment: any) => {
    
            tableData.push({
              rows: [
                { key: 'date', value: dateAdded, className: 'mt-4' },
                { key: 'type', value: payment.type },
                { key: 'method', value: payment.method },
                { key: 'amount', value: payment.amount },
                { key: 'remarks', value: payment.remarks },
                {
                  key: 'actions',
                  jsx: <div className='flex gap-2'>
                    <div className='text-blue-700 font-bold'>Update</div>
                  </div>
                }
              ]
            })
          })
    
          setTableData(tableData)
          setTablePagination({
            max: 1,
            display: 5,
          })
        }
      }
    
      useEffect(() => {
        setTableHeader([
          { title: 'Date', className: 'text-start', colSpan: 1 },
          { title: 'Type', className: 'text-start', colSpan: 1 },
          { title: 'Method', className: 'text-start', colSpan: 1 },
          { title: 'Amount', className: 'text-start', colSpan: 1 },
          { title: 'Remarks', className: 'text-start', colSpan: 1 },
          { title: 'Actions', className: 'text-start', colSpan: 1 },
        ])
    
        setTablePayload({ search: 'highest' })
        setTableDataRetriever(getPayments)
      }, [])
    
      return (
        <div>
          <div className="bg-slate-500 bg-opacity-5 rounded-lg p-5">
            <RenderTable/>
          </div>
        </div>
      )
}

export default Page
