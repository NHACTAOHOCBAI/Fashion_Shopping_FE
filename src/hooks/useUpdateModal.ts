import { useState } from "react";

const useUpdateModal = <T,>() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<T>()
    const openModal = (record: T) => {
        setData(record)
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setData(undefined)
        setIsModalOpen(false)
    }
    return { openModal, closeModal, data, isModalOpen }
}
export default useUpdateModal