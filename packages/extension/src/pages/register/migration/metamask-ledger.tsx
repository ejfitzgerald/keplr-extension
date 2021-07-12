import React, { FunctionComponent } from "react";
import { BackButton } from "../index";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Form } from "reactstrap";
import style from "../style.module.scss";
import { Input } from "../../../components/form";
import useForm from "react-hook-form";
import { RegisterConfig } from "@keplr-wallet/hooks";

interface FormData {
  name: string;
  ethAddress: string;
  password: string;
  confirmPassword: string;
}

export const MigrateMetamaskLedgerPage: FunctionComponent<{
  registerConfig: RegisterConfig;
  onBack: () => void;
}> = ({ registerConfig, onBack }) => {
  const intl = useIntl();

  const { register, errors, getValues } = useForm<FormData>({
    defaultValues: {
      name: "",
      ethAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      <h1>
        <FormattedMessage id="register.eth-migrate.metamask-ledger.title" />
      </h1>
      <Form
        className={style.formContainer}
        // onSubmit={handleSubmit(async (data: FormData) => {
        //   // extract the private key
        //   const privateKey = Buffer.from(
        //     data.ethPrivateKey.trim().replace("0x", ""),
        //     "hex"
        //   );
        //
        //   // attempt to parse the private key information
        //   const parsedKey = parseEthPrivateKey(privateKey);
        //   if (parsedKey === undefined) {
        //     alert("Unable to parse private key");
        //     return;
        //   }
        //
        //   // check that the parsed private key matches
        //   if (parsedKey.ethAddress !== data.ethAddress) {
        //     alert("This private key does not match the address provided");
        //     return;
        //   }
        //
        //   // trigger the on complete handler
        //   await registerConfig.createPrivateKey(
        //     data.name,
        //     privateKey,
        //     data.password
        //   );
        // })}
      >
        <Input
          label={intl.formatMessage({
            id: "register.name",
          })}
          type="text"
          name="name"
          ref={register({
            required: intl.formatMessage({
              id: "register.name.error.required",
            }),
          })}
          error={errors.name && errors.name.message}
        />
        <Input
          label={intl.formatMessage({
            id: "register.eth-migrate.eth-address",
          })}
          type="text"
          name="ethAddress"
          ref={register({
            required: intl.formatMessage({
              id: "register.eth-migrate.eth-address.error.required",
            }),
          })}
          error={errors.name && errors.name.message}
        />
        {registerConfig.mode === "create" && (
          <>
            <Input
              label={intl.formatMessage({
                id: "register.create.input.password",
              })}
              type="password"
              name="password"
              ref={register({
                required: intl.formatMessage({
                  id: "register.create.input.password.error.required",
                }),
                validate: (password: string): string | undefined => {
                  if (password.length < 8) {
                    return intl.formatMessage({
                      id: "register.create.input.password.error.too-short",
                    });
                  }
                },
              })}
              error={errors.password && errors.password.message}
            />
            <Input
              label={intl.formatMessage({
                id: "register.create.input.confirm-password",
              })}
              type="password"
              name="confirmPassword"
              ref={register({
                required: intl.formatMessage({
                  id: "register.create.input.confirm-password.error.required",
                }),
                validate: (confirmPassword: string): string | undefined => {
                  if (confirmPassword !== getValues()["password"]) {
                    return intl.formatMessage({
                      id:
                        "register.create.input.confirm-password.error.unmatched",
                    });
                  }
                },
              })}
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
          </>
        )}
        <Button color="primary" type="submit" block>
          <FormattedMessage id="register.create.button.next" />
        </Button>
      </Form>
      <BackButton onClick={onBack} />
    </>
  );
};
