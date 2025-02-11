"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {session ? (
        <>
          <p>ログイン中: {session.user?.name}</p>
          <img src={session.user?.image || ""} width={50} height={50} alt="User avatar" />
          <br />
          <button onClick={() => signOut()}>ログアウト</button>
        </>
      ) : (
        <>
          <p>ログイン方法を選択してください</p>
          <button onClick={() => signIn("google")}>Google でログイン</button>
          <br />
          <button onClick={() => signIn("github")}>GitHub でログイン</button>
        </>
      )}
    </div>
  );
}
