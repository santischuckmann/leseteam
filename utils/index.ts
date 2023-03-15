import { RequestMethods } from "@/constants";
import { endpoints } from "@/lib/config/endpoints";
import axios from "axios";

export const onChangeInput = <StateType extends Record<string, unknown>>({ update, name, value, strategy } : {
  update: React.Dispatch<React.SetStateAction<StateType>>,
  name: string;
  value: unknown
  strategy?: (prev: StateType) => StateType
}) => {
  update((prev) => ({
    ...prev,
    [name]: value
  }))
}

export const findIndexByIdPropertyInArray = <T extends { _id?: string }>({
  id,
  array
}: { id: string, array: T[] }) => {
  return array.findIndex(({ _id }) => _id === id)
}

export const insertInArrayByIndex = function <T>({
  index,
  array,
  item
}: { index: number, array: T[], item: T}) {
  const newArray = Array.from(array)

  newArray[index] = item

  return newArray
}

export const deleteInArrayByIndex = function <T>({
  index,
  array
}: { index: number, array: T[] }) {
  const newArray = Array.from(array)

  newArray.splice(index, 1)

  return newArray
}