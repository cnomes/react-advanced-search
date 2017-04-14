// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const Placeholder = styled.div`
    font-size: ${getTheme('fontSize')};
    color: ${getTheme('placeHolderColor')};
`;

export default Placeholder;
