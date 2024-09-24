export const chapterObject = ({ data }) => {
    let chapterInfo = {
        chapter: {
            id: data[0].chapterId,
            number: data[0].chapterNumber,
            title: data[0].chapterTitle,
        },
        book: {
            id: data[0].bookId,
            title: data[0].bookTitle,
        }
    }

    const chapterImages = data.map(chapter => chapter.image)
    chapterInfo.chapter.images = chapterImages

    return chapterInfo
}