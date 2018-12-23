class App extends React.Component {
   state = {
      inputElement: '',
      listElements: [],
      errInformation: false
   }

   handleElementNameInputChange = (event) => {
      this.setState({
         inputElement: event.currentTarget.value
      })
   }

   handleAddToShoppingList = (event) => {
      event.preventDefault();

      let shoppingList;

      shoppingList = this.state.listElements;

      if(this.state.inputElement !== '') {
         shoppingList.push({value: this.state.inputElement});

         this.setState({
            listElements: shoppingList,
            inputElement: '',
            errInformation: false
         })
      } else {
         this.setState({
            errInformation: true
         })
      }
   }

   render() { 
      return (  
         <div className='app'>
            <Title />
            <AddForm 
               changeElementNameInput={this.handleElementNameInputChange}
               clickAddToShoppingList={this.handleAddToShoppingList}
               inputElement={this.state.inputElement}
            />
            <ListAmount 
               listElements={this.state.listElements}
            />
            {this.state.errInformation && 
               <p className="app__error">Nie możesz dodać do listy pustej pozycji</p>
            }
            <ListElements 
               listElements={this.state.listElements}
            />
         </div>
      );
   }
}

const Title = () => (
   <header className='app__header'>My Shopping List</header>
)
 
const AddForm = ({changeElementNameInput, clickAddToShoppingList, inputElement}) => (
   <form className='app__form'>
      <input className='form__input' type="text" value={inputElement} onChange={ event => changeElementNameInput(event)}/>
      <button className='form__button' onClick={ (event) => clickAddToShoppingList(event)}> 
         Dodaj do listy 
      </button>
   </form>
)

const ListAmount = ({listElements}) => (
   <p className='app__amount'>Ilość pozycji na liście: {listElements.length}</p>
)

const ListElements = ({listElements}) => (
   <ul className='app__list'>
      {listElements.map(currentElement => <Element {...currentElement}/>)}
   </ul> 
)

const Element = (props) => (
   <li className='list__element'>{props.value}</li>
)

ReactDOM.render(<App/>, document.getElementById('root'));