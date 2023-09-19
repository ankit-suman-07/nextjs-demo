// pages/index.js
import Head from "next/head";
import ReduxProvider from "../components/ReduxProvider";
import ExpenseTracker from "../components/ExpenseTracker";

export default function Home() {
  return (
    <ReduxProvider>
      <div>
        <Head>
          <title>Expense Tracker</title>
          <meta name="description" content="Expense Tracker" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <ExpenseTracker />
        </main>
      </div>
    </ReduxProvider>
  );
}
