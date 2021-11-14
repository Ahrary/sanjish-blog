import { useState, useEffect } from 'react';

// creating LoadMore hook
export default function useLoadMore(
    items,
    loadMore,
    hasMore,
    isLoading,
    isLoadingMore,
    isLoadingMoreError
    ) {
    const [state, setState] = useState({
        items: [],
        isLoading: false,
        isLoadingMore: false,
        isLoadingMoreError: false,
        hasMore: false,
    });
    
    useEffect(() => {
        setState({
        items,
        isLoading: isLoading,
        isLoadingMore: isLoadingMore,
        isLoadingMoreError: isLoadingMoreError,
        hasMore: hasMore,
        });
    }, [items, isLoading, isLoadingMore, isLoadingMoreError, hasMore]);
    
    function loadMoreItems() {
        setState({
        ...state,
        isLoadingMore: true,
        isLoadingMoreError: false,
        });
        loadMore(state.items.length).then(
        (items) => {
            setState({
            ...state,
            items: [...state.items, ...items],
            isLoadingMore: false,
            hasMore: items.length > 0,
            });
        },
        (error) => {
            setState({
            ...state,
            isLoadingMore: false,
            isLoadingMoreError: true,
            });
        }
        );
    }
    
    return {
        ...state,
        loadMoreItems,
    };
}

