type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
      {eyebrow && (
        <div className="mb-3 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary/80">
          <span className="h-px w-10 bg-primary/35" />
          <span>{eyebrow}</span>
          <span className="h-px w-10 bg-primary/35" />
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-primary/65 to-transparent" />
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
