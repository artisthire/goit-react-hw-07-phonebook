import { useSelector, useDispatch } from 'react-redux';
import { contactsSelectors, contactsActions } from 'redux/contacts';
import { Label, LabelName, Input } from './Filter.styled';

function Filter() {
  const filterValue = useSelector(contactsSelectors.getFilterValue);
  const dispatch = useDispatch();

  const onFilterChange = ({ currentTarget }) =>
    dispatch(contactsActions.changeFilter(currentTarget.value));

  return (
    <Label>
      <LabelName>Find contact by name</LabelName>
      <Input
        type="search"
        name="filter"
        autoComplete="off"
        value={filterValue}
        onChange={onFilterChange}
      />
    </Label>
  );
}

export default Filter;
