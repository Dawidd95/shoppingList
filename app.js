class App extends React.Component {
   state = {
      inputElement: '',
      listElements: [],
      elementId: 0,
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
         shoppingList.push({id: this.state.elementId, value: this.state.inputElement});

         this.setState(prevState => ({
            listElements: shoppingList,
            inputElement: '',
            elementId: prevState.elementId+1,
            errInformation: false
         }))
      } else {
         this.setState({
            errInformation: true
         })
      }
   }

   handleRemoveFromListClick = (id) => {
      let listElements = this.state.listElements;
      
      listElements = listElements.filter(currentElement => currentElement.id !== id);
 
      this.setState({
         listElements
      })
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
               elementId={this.state.elemetId}
               removeFromListClick={this.handleRemoveFromListClick}
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

const ListElements = ({listElements, elementId, removeFromListClick}) => (
   <ul className='app__list'>
      {listElements.map(currentElement => <Element 
         key={currentElement.id}
         {...currentElement}
         removeFromListClick={removeFromListClick} 
      />)}
   </ul> 
)

const Element = (props) => (
   <div className='element'>
      <li className='list__element'>{props.value}</li>
      <img src="del.svg" alt="usun" onClick={() => props.removeFromListClick(props.id)}/>
   </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));