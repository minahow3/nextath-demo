"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {session ? (
        <>
          <p>ログイン中: {session.user?.name}</p>
          <Image src="/logo.png" alt="Logo" width={100} height={100} priority />          <br />
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
