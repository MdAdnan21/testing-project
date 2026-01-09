import test from '@lib/BaseTest';
import { BookListTable } from 'pageFactory/pageRepository/BookListTable';

test('Books page loads correctly @Smoke', async ({ bookListTable }) => {
  await bookListTable.navigate();
  await bookListTable.verifyTableLoaded();
});

test('Search works without page reload', async ({ bookListTable }) => {
  await bookListTable.navigate();
  await bookListTable.searchBook('JavaScript');
});
//booklisttable