"use client";

import { Link } from "@/types/link";
import { useEffect, useState } from "react";

export const useLinks = () => {
  const [links, setLinks] = useState<Array<Link>>([]);

  const findLink = (parentId: string | null, links: Array<Link>) => {
    for (const node of links) {
      if (node.id === parentId) return node;
      if (node.children) {
        const child: any = findLink(parentId, node.children);
        if (child) return child;
      }
    }
  };

  const addLink = (parentId: string | null, newLink: Link) => {
    const parent = findLink(parentId, links);

    if (parent) {
      parent.children.push(newLink);
      setLinks([...links]);
    } else {
      setLinks([...links, newLink]);
    }
  };

  const deleteLink = (parentId: string | null) => {
    const child = findLink(parentId, links);

    if (child.parentId === null) {
      const filteredLinks = links.filter((link) => link.id !== child.id);
      setLinks([...filteredLinks]);
    } else {
      const parent = findLink(child.parentId, links);
      const filteredLinks = parent.children.filter(
        (link: Link) => link.id !== parentId
      );

      parent.children = filteredLinks;
      setLinks([...links]);
    }
  };

  const editLink = (parentId: string | null, data: Link) => {
    const child = findLink(parentId, links);

    child.name = data.name;
    child.link = data.link;

    setLinks([...links]);
  };

  useEffect(() => {
    console.log(links);
  }, [links]);

  return { links, addLink, deleteLink, editLink };
};
