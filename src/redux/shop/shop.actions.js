import ShopActionTypes from './shop.types';
import { convertCollectionsToMap, database } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure= errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = database.ref('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsToMap(snapshot.val());
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error)));
  };
};
