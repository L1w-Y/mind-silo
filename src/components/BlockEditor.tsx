"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Block, BlockData } from "@/components/Block";

interface BlockEditorProps {
  initialBlocks: BlockData[];
}

export function BlockEditor({ initialBlocks }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<BlockData[]>(initialBlocks);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBlocks((prev) => {
      const oldIdx = prev.findIndex((b) => b.id === active.id);
      const newIdx = prev.findIndex((b) => b.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
  }, []);

  const handleWidthChange = useCallback(
    (id: string, width: BlockData["width"]) => {
      setBlocks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, width } : b))
      );
    },
    []
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={blocks.map((b) => b.id)} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {blocks.map((block) => (
            <Block
              key={block.id}
              block={block}
              onWidthChange={handleWidthChange}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
