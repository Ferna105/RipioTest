import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
const store = configureStore()

import AssetCard from '../../components/AssetCard';
it('renders correctly', () => {
    const tree = renderer.create(
        <Provider store = { store }>
            <AssetCard />    
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});