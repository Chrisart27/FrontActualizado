import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import styles from "./ModalSimple.module.css";

export default function ModalSimple({
  title,
  message,
  open,
  setOpen,
  buttonAction,
  error = false,
  confirmation = false,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className={styles.contenedor} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter={styles.entrada}
          enterFrom={styles.entrada_desde}
          enterTo={styles.entrada_hacia}
          leave={styles.salida}
          leaveFrom={styles.salida_desde}
          leaveTo={styles.salida_hacia}
        >
          <div className={styles.fondo} />
        </Transition.Child>

        <div className={styles.contenedor_modal}>
          <div className={styles.modal}>
            <Transition.Child
              as={Fragment}
              enter={styles.entrada}
              enterFrom={styles.transicion_entrada_desde}
              enterTo={styles.transicion_entrada_hacia}
              leave={styles.salida}
              leaveFrom={styles.transicion_salida_desde}
              leaveTo={styles.transicion_salida_hacia}
            >
              <Dialog.Panel className={styles.panel}>
                <div>
                  <div
                    className={`${styles.contenedor_icono} ${
                      confirmation
                        ? styles.contenedor_icono_advertencia
                        : error
                        ? styles.contenedor_icono_error
                        : styles.contenedor_icono_exito
                    }`}
                  >
                    {confirmation ? (
                      <ExclamationTriangleIcon
                        className={`${styles.icono} ${styles.icono_advertencia}`}
                        aria-hidden="true"
                      />
                    ) : error ? (
                      <XMarkIcon
                        className={`${styles.icono} ${styles.icono_error}`}
                        aria-hidden="true"
                      />
                    ) : (
                      <CheckIcon
                        className={`${styles.icono} ${styles.icono_exito}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className={styles.contenedor_titulo}>
                    <Dialog.Title as="h3" className={styles.titulo}>
                      {title}
                    </Dialog.Title>
                    <div className={styles.contenedor_texto}>
                      <p className={styles.texto}>{message}</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.contenedor_boton} ${
                    confirmation ? styles.dos_botones : ""
                  }`}
                >
                  {confirmation && (
                    <button
                      type="button"
                      className={`${styles.boton} ${styles.boton_cancelar}`}
                      onClick={() => setOpen(false)}
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    type="button"
                    className={`${styles.boton} ${
                      error || confirmation
                        ? styles.boton_error
                        : styles.boton_exito
                    }`}
                    onClick={() => {
                      if (buttonAction) buttonAction();
                      setOpen(false);
                    }}
                  >
                    De acuerdo
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
