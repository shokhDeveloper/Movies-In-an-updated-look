import ReactPaginate from "react-paginate"
import "./Pagination.css"
export const Pagination = (props) => {
    const handleChange = event => {
        props.setPage(event.selected+1)
    }
    return(  
        <ReactPaginate pageClassName="page_pagination" breakClassName="break" className="pagination" nextClassName="next" previousClassName="previous" pageCount={props.pageCount}  onPageChange={handleChange} />
    )
}