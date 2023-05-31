import ReactPaginate from "react-paginate"
export const Pagination = (props) => {
    const handleChange = event => {
        props.setPage(event.selected+1)
        console.log(props)
    }
    return(  
        <ReactPaginate pageCount={props.pageCount}  onPageChange={handleChange} />
    )
}