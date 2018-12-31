class App extends React.Component {
   state = {
      selected: 'all',
      inputElement: '',
      listElements: [],
      elementId: 0,
      errInformation: false,
      editModal: false,
      inputEdit: '',
      editElementId: ''
   }

   handleElementNameInputChange = (event) => {
      this.setState({
         [event.currentTarget.name]: event.currentTarget.value
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

   handleShowEditModalClick = (id) => {
      let element = [...this.state.listElements].map(currentElement => {
         if(currentElement.id === id) {
            return currentElement.value
         }
      });

      this.setState({
         editModal: true,
         inputEdit: element,
         editElementId: id 
      })
   }

   handleHideEditModalClick = () => {
      this.setState({
         editModal: false
      })
   }

   handleEditElement = () => {
      let listElements = [...this.state.listElements].map(currentElement => {
         if(currentElement.id === this.state.editElementId) {
            currentElement.value = this.state.inputEdit
         }

         return currentElement
      })
      
      this.setState({
         listElements,
         editModal: false
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

   render() { 
      return (  
         <div className='app'>
            <FilterButtons 
               filterClick={this.handleFilterClick}
            />
            {this.changeSection()}   
            <ListItems 
               selected={this.state.selected}
               listElements={this.state.listElements}
               removeFromListClick={this.handleRemoveFromListClick}
               addRemoveFavorites={this.handleAddRemoveFavorites}
               ShowEditModalClick={this.handleShowEditModalClick}
            />
            {this.state.editModal && <EditModal 
               editModal={this.state.editModal}
               inputEdit={this.state.inputEdit}
               elementNameInputChange={this.handleElementNameInputChange}
               hideEditModalClick={this.handleHideEditModalClick}
               editElement={this.handleEditElement}
            />}
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

const AllBooks = ({inputElement, listElements, errInformation, changeElementNameInput, clickAddToShoppingList}) => (
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
      <input name='inputElement' className='form__input' type="text" value={inputElement} onChange={ event => changeElementNameInput(event)}/>
      <button className='form__button' onClick={ (event) => clickAddToShoppingList(event)}> 
         Dodaj do listy 
      </button>
   </form>
)

const ListAmount = ({listElements}) => (
   <p className='app__amount'>Ilość pozycji na liście: {listElements.length}</p>
)

const ListItems = ({selected, listElements, removeFromListClick, addRemoveFavorites, ShowEditModalClick}) => {
   
   listElements = [...listElements];

   if(selected === 'all') {
      return listElements.map(currentElement => <Element 
         key={currentElement.id}
         {...currentElement}
         removeFromListClick={removeFromListClick}
         addRemoveFavorites={addRemoveFavorites}
         ShowEditModalClick={ShowEditModalClick}
      />)
   } else {
      let favoriteElements = listElements.filter(currentElement => {
         return currentElement.type === 'unfavorite'
      })

      return favoriteElements.map(currentElement => <Element 
         key={currentElement.id}
         {...currentElement}
         removeFromListClick={removeFromListClick}
         addRemoveFavorites={addRemoveFavorites}
         ShowEditModalClick={ShowEditModalClick}
      />)
   }
}

const Element = (props) => (
   <div className='element'>
      <li className='list__element'>{props.value}</li>
      <img src="del.svg" alt="usun" onClick={() => props.removeFromListClick(props.id)}/>
      <p className='element__type' onClick={() => props.addRemoveFavorites(props.id)}>
         {props.type}
      </p>
      <p className='element__edit' onClick={() => props.ShowEditModalClick(props.id)}>Edit</p>
   </div>
)

const EditModal = ({editModal, inputEdit, elementNameInputChange, hideEditModalClick, editElement}) => (
   <div className='edit__modal'>
      <dialog open={editModal}>
         <CloseModal 
            hideEditModalClick={hideEditModalClick}
         />
         <InputEditModal 
            inputEdit={inputEdit}
            elementNameInputChange={elementNameInputChange}
         />
         <ModalEditButton 
            editElement={editElement}
         /> 
      </dialog>
   </div>
)

const CloseModal = ({hideEditModalClick}) => (
   <p className='close' onClick={() => hideEditModalClick()}>
      X
   </p>
)

const InputEditModal = ({inputEdit, elementNameInputChange}) => (
   <input value={inputEdit} name='inputEdit' type="text" onChange={(event) => elementNameInputChange(event)}/>
)

const ModalEditButton = ({editElement}) => (
   <button className='dialog__button' onClick={() => editElement()}>Edit Element</button>
)

ReactDOM.render(<App/>, document.getElementById('root'));