import React, { FunctionComponent } from "react";
import { BackButton } from "../index";
import { FormattedMessage } from "react-intl";

export const MigrateMetamaskLedgerPage: FunctionComponent<{
  onBack: () => void;
}> = (props) => {
  return (
    <>
      <h1>
        <FormattedMessage id="register.eth-migrate.metamask-ledger.title" />
      </h1>
      <BackButton onClick={props.onBack} />
    </>
  );
};
