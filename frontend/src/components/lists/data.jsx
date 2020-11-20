import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItemNotes from './item-notes';
import './styles/data.scss';


export default class ListsData extends React.Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.move = this.move.bind(this);
        this.delete = this.delete.bind(this);

        this.state = {};
    }

    selectComment(id, type) {
        this.props.onSelect(id, type);
    }

    edit(item) {
        this.props.onEdit(item.id);
    }

    onDragStart(item) {        
        this.setState({
            draggingItem: item,
            draggingData: this.props.data
        });
    }

    onDragEnter(draggedOverId) {
        const { draggingItem } = this.state;

        if(draggingItem.id !== draggedOverId) {
            const draggingData = this.state.draggingData.filter(item => item.id !== draggingItem.id);

            const dropId = this.state.draggingData.findIndex(item => item.id === draggedOverId);
            draggingData.splice(dropId, 0, this.state.draggingItem);

            this.setState({ draggingData });
        }
    }

    onDragEnd() {
        const { draggingItem } = this.state;

        const pos = this.props.data.findIndex(item => item.id === draggingItem.id);
        const newPos = this.state.draggingData.findIndex(item => item.id === draggingItem.id);

        this.move(pos, newPos);
        this.setState({ draggingData: undefined, draggingItem: undefined });
    }

    move(pos, newPos) {
        if (newPos < 0 || newPos >= this.props.data.length) return;
        this.props.onReorder(pos, newPos);
    }

    delete(item) {
        this.props.onDelete(item.id);
    }

    render() {

        const { id, type } = this.props.selectedComment || { id: null, type: null };

        const data = this.state.draggingData || this.props.data;
        const length = data.length;

        const tableRows = data.map((item, index) => {

            const [singleSelected, twoSelected, threeSelected, fourSelected, fivePlusSelected]
                = ['1', '2', '3', '4', '5+'].map(t => index === id && t === type);

            return (
                <tr
                    key={index}
                    draggable
                    onDragStart={() => this.onDragStart(item)}
                    onDragEnter={() => this.onDragEnter(item.id)}
                    onDragEnd={() => this.onDragEnd()}
                >
                    <td>{item.description}</td>
                    <td>
                        { item.householdSizes.single.quantity }
                        <ListItemNotes
                            selected={singleSelected}
                            onToggle={ () => this.selectComment(index, '1') }
                            notes={item.householdSizes.single.notes}
                            onSelect={ this.selectComment } />
                    </td>
                    <td>
                        { item.householdSizes.familyOf2.quantity }
                        <ListItemNotes
                            selected={twoSelected}
                            onToggle={ () => this.selectComment(index, '2') }
                            notes={item.householdSizes.familyOf2.notes}
                            onSelect={ this.selectComment } />
                    </td>
                    <td>
                        { item.householdSizes.familyOf3.quantity }
                        <ListItemNotes
                            selected={threeSelected}
                            onToggle={ () => this.selectComment(index, '3') }
                            notes={item.householdSizes.familyOf3.notes}
                            onSelect={ this.selectComment } />
                    </td>
                    <td>
                        { item.householdSizes.familyOf4.quantity }
                        <ListItemNotes
                            selected={fourSelected}
                            onToggle={ () => this.selectComment(index, '4') }
                            notes={item.householdSizes.familyOf4.notes}
                            onSelect={ this.selectComment } />
                    </td>
                    <td>
                        { item.householdSizes.familyOf5Plus.quantity }
                        <ListItemNotes
                            selected={fivePlusSelected}
                            onToggle={ () => this.selectComment(index, '5+') }
                            notes={item.householdSizes.familyOf5Plus.notes}
                            onSelect={ this.selectComment } />
                    </td>
                    <td className="action-cell">
                        <span className={ 'item-action' + (index === 0 ? ' disabled' : '') } onClick={ () => this.move(index, index - 1) }>
                            <FontAwesomeIcon icon="arrow-up" />
                        </span>
                        <span className={ 'item-action' + (index === length - 1 ? ' disabled' : '') } onClick={ () => this.move(index, index + 1) }>
                            <FontAwesomeIcon icon="arrow-down" />
                        </span>
                        <span className="item-action primary" onClick={ () => this.edit(item) }>
                            <FontAwesomeIcon icon="edit" />
                        </span>
                        <span className="item-action danger" onClick={ () => this.delete(item) }>
                            <FontAwesomeIcon icon="times" />
                        </span>
                    </td>
                </tr>
            );
        })

        return (
            <table className="lists-data">
                <thead>
                    <tr>
                        <th rowSpan="2">Description</th>
                        <th colSpan="5" className="first">Quantities and Notes</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Single</th>
                        <th>Family of 2</th>
                        <th>Family of 3</th>
                        <th>Family of 4</th>
                        <th>Family of 5+</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { tableRows }
                </tbody>
            </table>
        );
    }

}
