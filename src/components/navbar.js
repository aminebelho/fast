import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { PcCase, CirclePlus, TableOfContents } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Ensure you're using js-cookie if you want to access cookies
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', current: true, icon: PcCase },
  { name: 'Vos tâches', href: 'tasks', current: false, icon: TableOfContents },
  { name: 'Ajouter une tâche', href: 'addTask', current: false, icon: CirclePlus },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' '); // Helper function to join class names
}

export default function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  // Only access Cookies or localStorage after the component mounts on the client side
  useEffect(() => {
    const emailFromCookies = Cookies.get('userEmail') || localStorage.getItem('userEmail');
    setUserEmail(emailFromCookies);
  }, []);

  const handleLogout = () => {
    // Clear user data from cookies and localStorage
    Cookies.remove('token');
    Cookies.remove('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    // Redirect to the login page
    router.push('/login');
  };

  if (!userEmail) {
    return null; // Return null or a loading state if the email is not yet available
  }

  return (
    <Disclosure as="nav" className="bg-[#059669] h-[9vh]">
      <div className="mx-auto max-w-7xl h-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className="hover:bg-[#34d399] text-white rounded-md px-3 py-2 text-sm font-semibold flex items-center space-x-2"
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  {/* Display email here */}
                  <div className='p-2 font-semibold text-white'>{userEmail}</div>
                  <img
                    alt="Profile"
                    src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      onClick={handleLogout} // Add the logout handler here
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Déconnexion
                    </a>
                  </MenuItem>
                </MenuItems>
              </div>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
