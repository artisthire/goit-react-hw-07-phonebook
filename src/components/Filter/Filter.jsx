import { useSelector, useDispatch } from 'react-redux';
import { filterSelectors, filterActions } from 'redux/filter';
import { Label, LabelName, Input } from './Filter.styled';

function Filter() {
  const filterValue = useSelector(filterSelectors.getFilter);
  const dispatch = useDispatch();

  const onFilterChange = ({ currentTarget }) =>
    dispatch(filterActions.setFilter(currentTarget.value));

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
