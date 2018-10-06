import * as React from "react";
import { FlatList, StyleSheet, FlatListProps } from "react-native";
import styled from "styled-components/native";
import { Touchable, Text, Strong } from ".";

const Book = styled(Touchable)`
  border-color: ${props => props.theme.colors.textFaded};
  border-style: solid;
  border-width: 2px;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const BookTitle = styled(Strong)`
  font-family: "Crimson Text";
  font-style: italic;
  font-size: 25px;
  text-transform: capitalize;
  margin-bottom: 13px;
`;

export type Author = {
  name: string;
  age: number;
};
export type Book = {
  id: number;
  author: Author;
  title: string;
};
export type Navigate = (...args: any[]) => void;
export type BookFlatListProps<T> = {
  user: string;
  navigate: Navigate;
} & Partial<FlatListProps<T>>;

class BookFlatList<B extends Book> extends React.Component<
  BookFlatListProps<B>
> {
  bookStyle = StyleSheet.create({
    book: {
      marginTop: 20,
      flex: 1,
      padding: 20
    }
  });

  extractKey = (book: B) => String(book.id);

  renderItem = ({ item: book }: { item: B }) => {
    const { navigate, user } = this.props;

    return (
      <Book onPress={() => navigate("Detail", { book, user })}>
        <BookTitle>{`${book.title}`}</BookTitle>
        <Text>{`${book.author && book.author.name}`}</Text>
      </Book>
    );
  };

  handleEndReached = ({ distanceFromEnd }: { distanceFromEnd: number }) => {
    if (distanceFromEnd < 0) {
      console.log("negative distance", distanceFromEnd)
      return
    }
    console.log(distanceFromEnd);
    return
  };

  render() {
    return (
      // @ts-ignore
      <FlatList
        style={this.bookStyle.book}
        renderItem={this.renderItem}
        keyExtractor={this.extractKey}
        onEndReachedThreshold={0.25}
        onEndReached={this.handleEndReached}
        {...this.props}
      />
    );
  }
}

export default BookFlatList;
