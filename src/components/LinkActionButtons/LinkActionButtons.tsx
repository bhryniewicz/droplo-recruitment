import { FC, useState } from "react";
import { useCurrentFormContext, useLinksContext } from "@/contexts";
import { LinkForm } from "@/screens/Home/components/LinkForm/LinkForm";
import { LinkPreviewProps } from "../LinkPreview";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type LinkActionButtons = Omit<LinkPreviewProps, "children" | "id">;

export const LinkActionButtons: FC<LinkActionButtons> = ({
  parentId,
  link,
  name,
  nestingLevel,
}) => {
  const { setCurrentForm } = useCurrentFormContext();
  const { deleteLink } = useLinksContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        className="md:hidden flex items-center justify-center w-8 h-8 text-font-primary"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <HiOutlineDotsHorizontal />
      </button>

      <div className="hidden md:flex rounded-lg text-sm text-font-primary shadow-link font-semibold border border-solid border-border-primary divide-x divide-[#D0D5DD]">
        <button className="py-2 px-4" onClick={() => deleteLink(parentId)}>
          Usuń
        </button>
        <button
          className="py-2 px-4"
          onClick={() =>
            setCurrentForm(
              <LinkForm
                parentId={parentId}
                link={link}
                name={name}
                key={parentId}
              />
            )
          }
        >
          Edytuj
        </button>
        <button
          className="py-2 px-4"
          onClick={() =>
            setCurrentForm(
              <LinkForm parentId={parentId} nestingLevel={nestingLevel} />
            )
          }
        >
          Dodaj pozycję menu
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg border border-solid border-border-primary rounded-lg flex flex-col w-40 z-10">
          <button
            className="py-2 px-4 text-left hover:bg-background-accent hover:text-white"
            onClick={() => {
              deleteLink(parentId);
              setIsMenuOpen(false);
            }}
          >
            Usuń
          </button>
          <button
            className="py-2 px-4 text-left hover:bg-background-accent hover:text-white"
            onClick={() => {
              setCurrentForm(
                <LinkForm
                  parentId={parentId}
                  link={link}
                  name={name}
                  key={parentId}
                />
              );
              setIsMenuOpen(false);
            }}
          >
            Edytuj
          </button>
          <button
            className="py-2 px-4 text-left hover:bg-background-accent hover:text-white"
            onClick={() => {
              setCurrentForm(
                <LinkForm parentId={parentId} nestingLevel={nestingLevel} />
              );
              setIsMenuOpen(false);
            }}
          >
            Dodaj pozycję menu
          </button>
        </div>
      )}
    </div>
  );
};
