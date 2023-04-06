export const defaultHeadTitle = 'Books application!'

export const BookReviewStatus = {
  Pending: 'PENDING',
  Published: 'PUBLISHED',
}

export const RequestMethods = {
  Post: 'POST',
  Get: 'GET',
  Delete: 'DELETE',
  Put: 'PUT',
}

export const DefaultOperationFields = {
  isDeleted: false,
}

export const RequestMethodsAxios = {
  Post: 'post',
  Get: 'get',
  Delete: 'delete',
  Put: 'put',
}

export const defaultBookReview = {
  bookTitle : '',
  status: BookReviewStatus.Pending,
  review: ''
}

export interface BookReview {
  bookTitle: string;
  status: typeof BookReviewStatus[keyof typeof BookReviewStatus];
  review: string;
  _id?: string;
}