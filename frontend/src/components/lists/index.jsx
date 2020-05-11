import React from 'react';
import { connect } from 'react-redux';
import {
    STATUS_LOADING, STATUS_SUCCESS, STATUS_FAILED
} from '../../constants';
import { fetchLists, toggleListSelection, clearListSelection } from '../../redux/actions';
import { getListsState } from '../../redux/selectors';
import Loading from '../common/loading';
import Error from '../common/error';
import ListsComments from './comments';
import ListsData from './data';
import ListsControls from './controls';

class Lists extends React.Component {

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
    }

    componentDidMount() {
        this.fetchLists();
        document.addEventListener('click', this.clearSelection, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clearSelection, false);
    }

    fetchLists() {
        this.props.fetchLists();
    }

    save() {
        // TODO
        console.log('Save button clicked!');
    }

    select(id, type) {
        this.props.toggleListSelection(id, type);
    }

    clearSelection() {
        this.props.clearListSelection();
    }

    isLoading() {
        return this.props.status === STATUS_LOADING;
    }

    isFailed() {
        return this.props.status === STATUS_FAILED;
    }

    isSuccessful() {
        return this.props.status === STATUS_SUCCESS;
    }

    getContents() {
        if (this.isLoading()) return <Loading />;
        if (this.isFailed()) return <Error message={'Unable to load requests'} />;
        return this.getListsContents();
    }

    getListsContents() {
        return (
            <div>
                <ListsComments />
                <ListsData
                    data={this.props.items}
                    selectedComment={this.props.selectedComment}
                    onSelect={ this.select } />
                <ListsControls onSave={ () => this.save() } />
            </div>
        );
    }

    render() {

        const contents = this.getContents();

        return (
            <div className="lists-container">
                <h2>Lists</h2>
                { contents }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return getListsState(state);
}

export default connect(
    mapStateToProps,
    { fetchLists, toggleListSelection, clearListSelection }
)(Lists);
