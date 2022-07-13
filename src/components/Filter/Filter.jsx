import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/contacts/contacts-actions';
import { getFilterValue } from 'redux/contacts/contacts-selectors';
import { Label, LabelName, Input } from './Filter.styled';

function Filter() {
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const onFilterChange = ({ currentTarget }) =>
    dispatch(changeFilter(currentTarget.value));

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
