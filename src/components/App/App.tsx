import {
  Button,
  Card,
  Center,
  Field,
  Footer,
  Form,
  Header,
  Navbar,
  Page,
  Toast,
  Toasts,
  ToastType,
} from "decentraland-ui";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { clearError } from "../../modules/error/actions";
import { selectError } from "../../modules/error/selectors";
import { transferRequest } from "../../modules/token/actions";
import {
  selectBalance,
  selectIsTransferring,
  selectSymbol,
} from "../../modules/token/selectors";
import { connectWalletRequest } from "../../modules/wallet/actions";
import {
  selectAddress,
  selectIsConnected,
  selectIsConnecting,
} from "../../modules/wallet/selectors";
import "./App.css";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/transfer" element={<Transfer />} />
        </Route>
      </Routes>
      <Toasts>
        <Error />
      </Toasts>
    </>
  );
};

const Error = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  if (!error) return null;

  const dispatchClearError = () => {
    dispatch(clearError());
  };

  return (
    <Toast
      type={ToastType.ERROR}
      title="Error"
      body={error}
      closable
      timeout={3000}
      onClose={dispatchClearError}
    />
  );
};

interface ConnectWalletProps {
  isConnecting: boolean;
  onConnect: () => void;
}

const ConnectWallet = ({ isConnecting, onConnect }: ConnectWalletProps) => {
  return (
    <Button primary onClick={onConnect} loading={isConnecting}>
      Connect
    </Button>
  );
};

const Layout = () => {
  const dispatch = useDispatch();

  const isConnecting = useSelector(selectIsConnecting);
  const isConnected = useSelector(selectIsConnected);

  const onConnect = () => {
    dispatch(connectWalletRequest());
  };

  return (
    <>
      <Navbar />
      <Page className="App">
        <Center>
          {isConnected ? (
            <Card>
              <Outlet />
            </Card>
          ) : (
            <ConnectWallet isConnecting={isConnecting} onConnect={onConnect} />
          )}
        </Center>
      </Page>
      <Footer />
    </>
  );
};

const Home = () => {
  const address = useSelector(selectAddress);
  const balance = useSelector(selectBalance);
  const symbol = useSelector(selectSymbol);

  return (
    <>
      <Header>Wallet</Header>
      <p>
        <strong>Address:</strong>{" "}
        {address.slice(0, 6) + "..." + address.slice(-4)}
      </p>
      <p>
        <strong>Balance:</strong> {balance} {symbol}
        <Button href="/transfer" basic>
          TRANSFER
        </Button>
      </p>
    </>
  );
};

const Transfer = () => {
  const dispatch = useDispatch();
  const isTransferring = useSelector(selectIsTransferring);
  const balance = useSelector(selectBalance);
  const symbol = useSelector(selectSymbol);

  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: 0,
      to: "",
    },
  });

  const onSubmit = handleSubmit(async ({ amount, to }) => {
    dispatch(transferRequest(to, amount));
  });

  return (
    <Form onSubmit={onSubmit} loading={isTransferring}>
      <Controller
        name="amount"
        control={control}
        rules={{ min: 0, max: balance }}
        render={({ field }) => (
          <Field
            {...field}
            label="AMOUNT"
            type="number"
            message={`Available: ${balance} ${symbol}`}
            error={Boolean(formState.errors.amount)}
          />
        )}
      />
      <Controller
        name="to"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Field
            {...field}
            label="ADDRESS"
            type="address"
            error={Boolean(formState.errors.to)}
          />
        )}
      />
      <Button type="submit" primary fluid disabled={!formState.isValid}>
        TRANSFER
      </Button>
    </Form>
  );
};
