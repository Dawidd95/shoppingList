class App extends React.Component {
   state = {
      selected: 'all',
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
         shoppingList.push({id: this.state.elementId, value: this.state.inputElement, type: 'favorite'});

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

   handleFilterClick = (type) => {
      if(type === 'Pokaż wszystkie') {
         this.setState({
            selected: 'all'
         })
      } else {
         this.setState({
            selected: 'favorites'
         })
      }
   }

   handleAddRemoveFavorites = (id) => {
      let listElements = [...this.state.listElements];

      listElements = listElements.map( currentElement => {
         if(currentElement.id === id) {
            if(currentElement.type === 'favorite') {
               currentElement.type = 'unfavorite';
            } else {
               currentElement.type = 'favorite';
            }
         } 

         return currentElement;
      })
      
      this.setState({
         listElements: listElements
      })
   }

   changeSection = () => {
      if(this.state.selected === 'all') {
         return(
            <div>
               <Title 
                  content='My Shopping List'
               />
               <AllBooks 
                  inputElement={this.state.inputElement}
                  listElements={this.state.listElements}
                  elementId={this.state.elemetId}
                  errInformation={this.state.errInformation}
                  changeElementNameInput={this.handleElementNameInputChange}
                  clickAddToShoppingList={this.handleAddToShoppingList}              
                  removeFromListClick={this.handleRemoveFromListClick}
                  addRemoveFavorites={this.handleAddRemoveFavorites}
               />
            </div>          
         )
      } else { return <Title content='Favorites'/> }
   } 

   // moglibysmy dorobic w <ListElements /> {} return() i tez podobnie zawarunkowac
   filterBooks = () => {
      if(this.state.selected === 'all') {
         return [...this.state.listElements].map(currentElement => <Element 
            key={currentElement.id}
            {...currentElement}
            removeFromListClick={this.handleRemoveFromListClick}
            addRemoveFavorites={this.handleAddRemoveFavorites}
         />)
      } else {
         let favoriteElements = [...this.state.listElements].filter(currentElement => {
            return currentElement.type === 'unfavorite'
         })

         favoriteElements = favoriteElements.map(currentElement => <Element 
            key={currentElement.id}
            {...currentElement}
            removeFromListClick={this.handleRemoveFromListClick}
            addRemoveFavorites={this.handleAddRemoveFavorites}
         />)

         return favoriteElements
      }
   }

   render() { 
      return (  
         <div className='app'>
            <FilterButtons 
               filterClick={this.handleFilterClick}
            />
            {this.changeSection()}   
            {this.filterBooks()}
         </div>
      );
   }
}

const FilterButtons = ({filterClick}) => (
   <div className='app__filter'>
      <Button 
         content='Pokaż wszystkie'
         filterClick={filterClick}
      />
      <Button 
         content='Ulubione'
         filterClick={filterClick}
      />
   </div>
)

const Button = ({content, filterClick}) => (
   <button className='filter__button' onClick={() => filterClick(content)}>{content}</button>
)

const Title = ({content}) => (
   <header className='app__header'>{content}</header>
)

const AllBooks = ({inputElement, listElements, elementId, errInformation, changeElementNameInput, clickAddToShoppingList, removeFromListClick, addRemoveFavorites}) => (
   <div>
      <AddForm 
         changeElementNameInput={changeElementNameInput}
         clickAddToShoppingList={clickAddToShoppingList}
         inputElement={inputElement}
      />
      <ListAmount 
         listElements={listElements}
      />
      {errInformation && 
         <p className="app__error">Nie możesz dodać do listy pustej pozycji</p>
      }
   </div>
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

const Element = (props) => (
   <div className='element'>
      <li className='list__element'>{props.value}</li>
      <img src="del.svg" alt="usun" onClick={() => props.removeFromListClick(props.id)}/>
      <p className='element__type' onClick={() => props.addRemoveFavorites(props.id)}>
         {props.type}
      </p>
   </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));