프로젝트 이슈

// 문제점
![스크린샷 2025-02-25 221309](https://github.com/user-attachments/assets/98144d52-b3e9-4bb0-abeb-269aa3495579)

![스크린샷 2025-02-25 221416](https://github.com/user-attachments/assets/22abf968-2c4e-450c-9129-47e1a119732d)

store에 있는 데이터를 불러올때 loop 오류 발생


// 해결법
![스크린샷 2025-02-25 223748](https://github.com/user-attachments/assets/d6859a31-77d0-4210-a1d7-1f45f190c8fa)

useMemo를 통해 반복 계산 / 재렌더링이 되지않는것을 확인해 최적화 성공

배포 후 이슈
![image](https://github.com/user-attachments/assets/65ad6cf3-c3a2-44fa-a6c1-86f369852e1a)
오류는 클라이언트 컴포넌트 랜더링 시 오류로 보여짐

![image](https://github.com/user-attachments/assets/fc54a65e-cc05-4d9f-a426-5c576622de3c)
예외처리를 위해 commponents 폴더 내부에 파일 생성





//legacy
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
