import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Page = styled.div`
  padding: 1.5em 6em;
`

export const Navigation = styled.div`
  background: #1aacac;
  color: white;
  padding: 0.8em 6em;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Button = styled.button`
  background: ${(props) =>
    props.variant === 'primary' ? '#362fd9' : '#CCCCCC'};
  color: ${(props) => (props.variant === 'primary' ? 'white' : 'black')};
  padding: 6px 12px;
  margin: 5px 0 0 0;
  border: none;
  border-radius: 12px;

  &:hover {
    cursor: pointer;
  }
`

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid white;
    transition: all 0.3s ease;
  }
`

export const BlogItem = styled(Link)`
  color: black;
  text-decoration: none;
  }
`

export const Input = styled.input`
  background-color: white;
  border: #CCCCCC solid 1px; /* Borde más claro */
  padding: 5px 12px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;


export const SubmitButton = styled.button`
  background: #362fd9;
  color: white;
  padding: 6px 12px;
  border: none;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;

  &:hover {
    cursor: pointer;
  }
`

