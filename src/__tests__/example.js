import React, { act } from 'react';
import { render, within, waitFor, fireEvent } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";
import { SigIn } from '../components/SigIn';


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {

      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

    const transformNumber = (number, flag) => {
        number = number / 1000;
        const integerNumber = Math.floor(number);
        const floatNumber = number - integerNumber;
        const decimal = Math.round(floatNumber * 10);

        let integerString = integerNumber.toString();
        
        if(decimal !== 0 && flag){
            integerString += '.'+ decimal.toString() + 'k';
        }else if(flag){
            integerString += 'k';
        }
        return integerString;
    }

      const { debug, getAllByTestId} = render(
        <RepositoryListContainer data={{ repositories}}/>
      )

      debug();
      const items = getAllByTestId('Item');
      expect(items).toHaveLength(2);

      for(let i = 0; i < items.length; i++){
        const node = repositories.edges[i].node
        expect(within(items[i]).getByTestId('fullname')).toHaveTextContent(node.fullName);
        expect(within(items[i]).getByTestId('description')).toHaveTextContent(node.description);
        expect(within(items[i]).getByTestId('lenguage')).toHaveTextContent(node.language);
        expect(within(items[i]).getByTestId('stargazersCount')).toHaveTextContent(transformNumber(node.stargazersCount, true));
        expect(within(items[i]).getByTestId('forksCount')).toHaveTextContent(transformNumber(node.forksCount, true));
        expect(within(items[i]).getByTestId('reviewCount')).toHaveTextContent(node.reviewCount.toString());
        expect(within(items[i]).getByTestId('ratingAverage')).toHaveTextContent(node.ratingAverage.toString());
      }
    });
  });
});

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SigIn onSubmit={onSubmit}/>);

      await act(async () => {
        fireEvent.changeText(getByTestId('username'), 'kalle');
      });

      await act(async () => {
        fireEvent.changeText(getByTestId('password'), 'password');
      });

      await act(async () => {
        fireEvent.press(getByTestId('submittButton'));
      })

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
            user: 'kalle',
            password: 'password'
        })
      });
    });
  });
});