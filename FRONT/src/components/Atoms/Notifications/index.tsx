import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useApp } from '@/models/contexts/AppContext'

export type TTypeAlert = "error" | "success" | "warning" | ""

type TNotificationsProps = {
    title: string
    message?: string
    typeAlert: any
    show: boolean
}

export default function Notifications({ show, typeAlert = "error", title, message }: TNotificationsProps) {
    const { setAlertContext } = useApp();

    function selectIconByTypeAlert(typeAlert: string) {
        switch (typeAlert) {
            case "error":
                return <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
            case "success":
                return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
            case "warning":
                return <ExclamationCircleIcon className="h-6 w-6 text-amber-400" aria-hidden="true" />
            default:
                return <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        }
    }

    return (
        <>
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        {selectIconByTypeAlert(typeAlert)}
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">{title}</p>
                                        <p className="mt-1 text-sm text-gray-500">{message}</p>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => setAlertContext({ show: false, title: "", message: "", type: "" })}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
