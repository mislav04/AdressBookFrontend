import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Pagination, Select } from 'semantic-ui-react'
import { useHistory } from "react-router-dom"

import * as actions from "../actions"
import ContactCard from "../components/ContactCard"
import styles from "./AddressBook.module.scss"
import Title from "../components/Title"
import Filters from "../components/Filters"
import AppHeader from '../components/AppHeader'
import { INITIAL_FILTERS, ORDER_BY_OPTIONS } from "../lib/constants"


export default function AddressBook(props) {

    const isFavouritesPage = props.match.path.includes("omiljeni")

    const dispatch = useDispatch();
    const history = useHistory()
    const page = useRef(1)

    const [filters, setFilters] = useState(INITIAL_FILTERS)
    const [orderBy, setOrderBy] = useState("asc")

    const localActions = {
        loadAllContacts: (page, filters, orderBy, onlyFavourite) => dispatch(actions.contact.loadAllContacts(page, filters, orderBy, onlyFavourite))
    };

    const globalState = {
        isLoading: useSelector(state => state.ui.isLoading),
        allContacts: useSelector(state => state.contact.allContacts),
        count: useSelector(state => state.contact.contactsCount)
    };

    useEffect(() => {
        localActions.loadAllContacts(page.current, filters, orderBy, isFavouritesPage ? true : false);
    }, [])

    useEffect(() => {
        page.current = 1
        localActions.loadAllContacts(page.current, filters, orderBy, isFavouritesPage ? true : false)
    }, [filters.firstName, filters.lastName, filters.email])

    const changePage = (e, data) => {
        page.current = data.activePage
        localActions.loadAllContacts(data.activePage, filters, orderBy, isFavouritesPage ? true : false)
    }

    const onFilterChange = (filter, value) => {
        if (globalState.isLoading) {
            return
        }
        setFilters({
            ...filters,
            [filter]: filters ? value.trim() : ''
        })
    }

    const onChangeOrderBy = (e, data) => {
        setOrderBy(data.value)
        localActions.loadAllContacts(page.current, filters, data.value, isFavouritesPage ? true : false)
    }

    const onFavouriteUpdated = () => {
        localActions.loadAllContacts(page.current, filters, orderBy, isFavouritesPage ? true : false)
    }

    const onNameClick = (key) => {
        history.push(`/kontakt/detalji/${key}`)
    }

    return (
        <div className={styles["address-book-wrapper"]}>
            <AppHeader path={props.match.path} />
            <Title title={isFavouritesPage ? "Favourite contacts" : "Address Book"} icon="address book" />
            <Filters onFilterChange={onFilterChange} filters={filters} />
            <div>
                {"Sorted by Last Name: "}
                <Select options={ORDER_BY_OPTIONS} onChange={onChangeOrderBy} defaultValue={orderBy} />
            </div>
            {
                globalState.allContacts.length > 0 &&
                <>

                    <div className={styles["grid-wrapper"]}>
                        {
                            globalState.allContacts.map((contact) => {
                                return <ContactCard contact={contact} key={contact.id} callback={onFavouriteUpdated} onNameClick={onNameClick} />
                            })
                        }
                    </div >
                    <div className={styles["pagination-wrapper"]}>
                        <Pagination
                            boundaryRange={0}
                            defaultActivePage={page.current}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={globalState.count}
                            onPageChange={changePage}
                        />
                    </div>
                </>

            }
        </div>

    )
}