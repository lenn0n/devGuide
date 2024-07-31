import { useReducer, useCallback, useRef, useEffect, useMemo } from 'react'

interface TableProps {
  className?: string,
  showPagination: boolean,
  itemsPerDisplay?: number,
  loadingComponent?: React.ReactNode,
  noResultsComponent?: React.ReactNode,
  customPagination?: React.ReactNode,
  childrenPosition?: 'top' | 'bottom',
  placeholderCount?: number
}

interface TableHeaderProps {
  title?: string,
  className?: string,
  colSpan?: number | undefined,
  jsx?: React.ReactNode
}

interface TableDataProps {
  key?: string | number,
  className?: string,
  rows: []
}

interface TableDataRowProps {
  key?: string | number
  value: string,
  className?: string,
  colSpan?: number,
  jsx?: React.ReactNode,
}

interface TablePaginationProps {
  max: number,
  display: number,
}

interface StateProps {
  isTableLoading: boolean,
  headers: TableHeaderProps[],
  data: TableDataProps[],
  pagination: TablePaginationProps,
  payload: {
    page: number
  }
}

interface ActionProps {
  type: string,
  payload: {}
}

const reducer = (state: StateProps, action: ActionProps): any => {
  const { type, payload } = action
  switch (type) {
    case 'SET_HEADERS':
      return { ...state, headers: payload }
    case 'SET_DATA':
      return { ...state, data: payload }
    case 'SET_TABLE_LOADING':
      return { ...state, isTableLoading: payload }
    case 'SET_TABLE_PAGINATION':
      return { ...state, pagination: payload }
    case 'SET_TABLE_PAYLOAD':
      return { ...state, payload: { ...state.payload, ...payload } }
    default:
      return state
  }
}

const initialState = {
  headers: [],
  data: [],
  isTableLoading: true,
  payload: {
    page: 1
  },
  pagination: {
    max: 1,
    display: 5,
  }
}

const useTable = (tableProps: TableProps) => {
  const dataRetriever = useRef<Function>()
  const [state, dispatch] = useReducer(reducer, initialState)
  const tablePayload = state.payload;
  const childrenPosition = tableProps.childrenPosition || 'top'

  const setTableHeader = (headers: TableHeaderProps[]) => {
    dispatch({ type: 'SET_HEADERS', payload: headers })
  }

  const setTableData = (data: TableDataProps[]) => {
    dispatch({ type: 'SET_DATA', payload: data })
  }

  const setTableLoading = (isLoading: boolean) => {
    dispatch({ type: 'SET_TABLE_LOADING', payload: isLoading })
  }

  const setTablePagination = (pagination: TablePaginationProps) => {
    dispatch({ type: 'SET_TABLE_PAGINATION', payload: pagination })
  }

  const setTablePayload = (payload: any) => {
    dispatch({ type: 'SET_TABLE_PAYLOAD', payload: payload })
  }

  const setTableDataRetriever = (cb: Function) => {
    if (typeof cb === 'function' && cb !== null) {
      dataRetriever.current = cb
    }
  }

  const tablePayloadMemoize = useMemo(() =>
    tablePayload, [JSON.stringify(tablePayload)])

  const retrieveReport = async () => {
    if (dataRetriever.current) {
      setTableLoading(true)
      await dataRetriever.current(tablePayload)
      setTableLoading(false)
    }
  }

  useEffect(() => {
    retrieveReport()
  }, [tablePayloadMemoize, dataRetriever.current])

  const TableHeader = useCallback(() => (
    <thead>
      <tr className={`table-header`}>
        {state.headers.length > 0 && state.headers.map((header: TableHeaderProps) =>
          <th key={header.title} className={`${header.className}`} colSpan={header.colSpan}>
            {header.title} {header.jsx}
          </th>
        )}
      </tr>
    </thead>
  ), [state.headers])

  const TableBody = useCallback(() => (
    <>
      {state.data.length > 0 && state.data.map((tableData: TableDataProps, index: number) =>
        <tr key={"tbody_tr_" + index} className={tableData.className ?? 'td-zebra'}>
          {tableData.rows.length > 0 && tableData.rows.map((row: TableDataRowProps, index: number) => (
            <>
              <td key={row.key} className={`${row.className} td-desktop-items`} colSpan={row.colSpan}>
                {row.value} {row.jsx}
              </td>
              <div key={row.key + "_mobile"} className={`${row.className} td-mobile-items`} >
                <div className='wrapper'>
                  <div className='title'>{state.headers?.[index]?.title?? '-'}</div>
                  <div> {row.jsx ?? row.value}</div>
                </div>
              </div>
            </>
          ))}
        </tr>
      )}
    </>
  ), [state.data])

  const Pagination = useCallback(() => {
    if (tableProps.showPagination) {
      return tableProps.customPagination ?? <RenderPagination />
    } else {
      return <></>
    }
  }, [tableProps.showPagination, tableProps.customPagination, state.isTableLoading, state.payload.page, state.pagination.max])

  const RenderPagination = () => {
    let buttons = [],
      delta = 2,
      start = state.payload.page - delta,
      end = state.pagination.max + delta,
      display = state.pagination.display;

    for (let index = start; index < end; index++) {
      if (buttons.length < display && index > 0 && index <= (end - delta)) {
        buttons.push(index)
      }
    }

    return <div className={`pagination-parent`}>
      {buttons.map((btn =>
        <button
          key={'pagination_#_' + btn}
          onClick={() => { setTablePayload({ page: btn }) }}
          className={`pagination-buttons ${btn == start + 2 ? 'active' : 'inactive'} `}>
          {btn}
        </button>))}
    </div>
  }

  const Loader = useCallback(() =>
    tableProps.loadingComponent ??
    <>
      {new Array(tableProps.placeholderCount).fill(1).map(() => <tr className='table-loader'>
        {state.headers?.length > 0 && state.headers.map(() => <td>
          <div className="skeleton"></div>
        </td>)}
      </tr>)}

    </>,
    [tableProps.loadingComponent, state.headers, tableProps.placeholderCount])

  const NoResults = useCallback(() =>
    tableProps.noResultsComponent ??
    <div className='table-no-results'>There is no results to display.</div>,
    [tableProps.noResultsComponent])

  const RenderTable = ({ children }: { children?: React.ReactNode }) =>
    <>
      {childrenPosition === 'top' && children}
      <table className={`${tableProps.className}`}>
        <TableHeader />
        <tbody>
          {!state.isTableLoading && state.data.length > 0 && <TableBody />}
          {state.isTableLoading && <Loader />}
        </tbody>
      </table>
      {!state.isTableLoading && state.data.length === 0 && <NoResults />}
      <Pagination />
      {childrenPosition === 'bottom' && children}
    </>

  return {
    setTableHeader,
    setTableData,
    setTableLoading,
    setTablePagination,
    setTablePayload,
    setTableDataRetriever,
    tablePayload,
    RenderTable
  }
}

export default useTable
