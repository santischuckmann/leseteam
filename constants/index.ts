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
  review: '',
  isPublic: false
}

export interface BookReview {
  bookTitle: string;
  status: typeof BookReviewStatus[keyof typeof BookReviewStatus];
  review: string;
  isPublic: boolean;
  _id?: string;
}

export const textFields = [
  {
    name: 'bookTitle',
    value: (state: typeof defaultBookReview) => state.bookTitle,
    placeholder: 'Escribe el nombre del libro a reseñar'
  },
  {
    name: 'review',
    value: (state: typeof defaultBookReview) => state.review,
    placeholder: 'Escribe la reseña',
    props: {
      multiline: true
    }
  }
]