import { BookData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';

// export const dynamicParams = false;
export const generateStaticParams = () => {
  return [{ id: '1' }, { id: '2' }];
};

async function BookDetail({ bookId }: { bookId: String }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>찾을 수 없는 책입니다..</div>;
  }
  const data: BookData = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    data;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor() {
  async function createReviewAction(formData: FormData) {
    'use server';
    const content = formData.get('content');
    const author = formData.get('author')?.toString();
  }
  return (
    <section>
      <form action={createReviewAction}>
        <input
          name='content'
          placeholder='리뷰 내용'
        />
        <input
          name='author'
          placeholder='작성자'
        />
        <button type='submit'>작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor />
    </div>
  );
}
