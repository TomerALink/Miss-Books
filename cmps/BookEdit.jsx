import { bookService } from "../services/book.service.js"

const { useState , useEffect} = React
const { useNavigate , useParams} = ReactRouterDOM


export function BookEdit() {
    
    const [bookToEdit, setbookToEdit ] = useState(bookService.getEmptyBook())
    const {title, listPrice } = bookToEdit
    const {bookId} = useParams()
    
    

    useEffect(()=>{
        if(bookId) loadBook()
        
        
    }, [])

    function loadBook() {
        bookService.get(bookId).then(setbookToEdit)
    }    

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        // setbookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        setbookToEdit(prevBook => {
            if (field === 'amount') {
                return {
                    ...prevBook,
                    listPrice: {
                        ...prevBook.listPrice,
                        amount: value
                    }
                }
            } else {
                return { ...prevBook, [field]: value }
            }
        })
    }


    
   

    const navigate = useNavigate()

    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(book => {
            console.log('book saved secsesfully', book)
        })
        .catch(err => 
            console.log('error at saving book: ', err)
        ).finally(()=>{
            navigate(`/book`)
        })
    }
    

    return <section className="book-edit">
        <h1>{bookToEdit.id ? 'Edit' : 'Add'} Book</h1>
        <form onSubmit={onSaveBook}>
            <label htmlFor="title"> Book Title</label>
            <input onChange={handleChange} value={title}  
            type="text" name="title" id="title" />

            <label htmlFor="price">Price</label>
            <input onChange={handleChange} value={listPrice.amount} 
            type="number" name="amount" id="price" />
            <button>Save</button>
        </form>

    </section>
}