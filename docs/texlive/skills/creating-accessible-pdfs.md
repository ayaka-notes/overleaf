# Creating accessible PDFs

Over time, updates to the capabilities of PDF creation have made PDF accessibility possible. Strides including the [LaTeX Tagging Project](https://latex3.github.io/tagging-project/documentation/) have enabled LaTeX-based PDFs to be accessible as well, and improvements continue to occur.

{% hint style="success" %}
The release of [TeX Live 2025](https://www.overleaf.com/blog/tex-live-2025-is-now-available), in particular, is what makes this process possible in Overleaf. Note that **LuaLaTeX** is the recommended compiler when using MathML.

You can ensure your project's settings are set up accordingly by learning how to [change compilers and TeX Live versions](https://docs.overleaf.com/getting-started/recompiling-your-project/selecting-a-tex-live-version-and-latex-compiler).
{% endhint %}

Our approach is largely informed by the LaTeX Project's [accessible PDF instructions](https://latex3.github.io/tagging-project/documentation/usage-instructions), which you can refer to for more details on the following topics.

{% hint style="warning" %}
Note that implementing these practices doesn't guarantee that every element of your project is accessible—see this page's FAQs section for more information.
{% endhint %}

### <i class="fa-tag">:tag:</i> Tagging

In essence, PDF tagging is a process that automatically creates a "structure" that is easily identified by screen readers, and is more searchable both now and in the future. It leverages the existing structure defined by your LaTeX code so the screen reader can differentiate between elements like headers, body text, figures, and equations.

TeX Live 2025 fully supports automated PDF tags with the `\DocumentMetaData` declaration. Add this declaration before `\documentclass`. There are two important keys to this declaration that affect tagging capabilities: `tagging` and `tagging-setup` .

#### **`tagging`**

Ensure that tagging is enabled by setting the `tagging` key to `on`.

<pre class="language-latex" data-overflow="wrap" data-expandable="true"><code class="lang-latex">\DocumentMetadata{<a data-footnote-ref href="#user-content-fn-1">tagging=on</a>}
</code></pre>

#### **`tagging-setup`**

Configure how your document is tagged by changing the value of the `tagging-setup` key.

<pre class="language-latex" data-overflow="wrap" data-expandable="true"><code class="lang-latex">\DocumentMetadata{<a data-footnote-ref href="#user-content-fn-1">tagging=on</a>,<a data-footnote-ref href="#user-content-fn-2">tagging-setup={math/setup=mathml-SE}</a>}
</code></pre>

{% hint style="info" %}
In this example, we used \`math/setup=mathml-SE\` for MathML Structure Element tagging, but it can be set to any value that \[\`\tagpdfsetup\`]\(https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/tagpdf/tagpdf.pdf) supports.
{% endhint %}

### <i class="fa-text-size">:text-size:</i> Descriptions

In addition to automatic tagging, you may also need to also add descriptions of the content of the elements, particularly if your document contains images and/or tables.

#### <i class="fa-image">:image:</i> Images

It's simple to add vital descriptions for images in Overleaf, which can also help with understanding the context of certain images when referencing the LaTeX code. All you have to do is add the associated image description option in each instance of `\includegraphics`. There are three main types of images to distinguish for accessibility: images that require alternative (alt) text, artifacts, and images that translate to actual text.

**Alt text**

Adding alternative text to images ensures that the photo has a description that can be used as a text-based substitute to the visual. Use the `alt` key and input a text value.

<pre class="language-latex" data-title="Alt text example" data-overflow="wrap"><code class="lang-latex">\includegraphics[width=0.25\linewidth,<a data-footnote-ref href="#user-content-fn-3">alt={Macro photo of a green frog's head and hands}</a>]{frog.jpg}
</code></pre>

**Artifacts**

If an image doesn't need to be picked up by a screen reader (i.e., if it's purely decoration), mark the image as an artifact. Use the `artifact` key without assigning a value.

<pre class="language-latex" data-title="Artifact example" data-overflow="wrap"><code class="lang-latex">\includegraphics[<a data-footnote-ref href="#user-content-fn-4">artifact</a>]{.jpg}
</code></pre>

**Actual text**

If an image is a solely a picture of a Unicode character, then include the text-based character. Use the `actualtext` key and assign it a single character (without brackets).

<pre class="language-latex" data-title="Actual text example" data-overflow="wrap"><code class="lang-latex">\includegraphics[<a data-footnote-ref href="#user-content-fn-5">actualtext=B</a>]{.jpg}
</code></pre>

#### <i class="fa-table">:table:</i> Tables

While tables usually have text associated with them, it's still important that the text is associated with the correct aspects of the table. Add `\tagpdfsetup` before your `tabular` or in the preamble to begin the set up for your Overleaf project's tables. There are two main types of tables to distinguish for accessibility: data tables and presentation tables.

**Data tables**

If a table has at least one header row, then designate which rows are the header rows. Use the `table/header-rows` key and input a series of numbers that correspond with the locations of the header rows.

<pre class="language-latex" data-title="Data table example"><code class="lang-latex">\tagpdfsetup{<a data-footnote-ref href="#user-content-fn-6">table/header-rows={1}</a>}
\begin{tabular}{l|r}
Item &#x26; Quantity \\\hline
Widgets &#x26; 42 \\
Gadgets &#x26; 13
\end{tabular}
</code></pre>

**Presentation tables**

If a table is not meant to be interpreted as a table by a screen reader, then mark it as a presentation table. Use the `table/tagging=presentation` key.

<pre class="language-latex" data-title="Presentation table example"><code class="lang-latex">\tagpdfsetup{<a data-footnote-ref href="#user-content-fn-7">table/tagging=presentation</a>}
\begin{tabular}{cc}
\textbullet &#x26; \textbullet \\
''' &#x26; '''
\end{tabular}
</code></pre>

### <i class="fa-comments-question">:comments-question:</i> FAQs <a href="#faqs" id="faqs"></a>

<details>

<summary>Are there any tools that can help verify that my document is accessible?</summary>

Yes, there are several external tools, including [veraPDF](https://verapdf.org/), that can validate PDF/A parts and conformance levels. Additionally, you can use a tool such as [WebAIM](https://webaim.org/) to calculate the contrast ratio between two colors.

</details>

<details>

<summary>Are the packages in my Overleaf project compatible with these features?</summary>

You can refer to the LaTeX Tagging Project's [packages status list](https://latex3.github.io/tagging-project/tagging-status/).

</details>

<details>

<summary>Can I still use <code>beamer</code>? Are there other packages available for presentations?</summary>

There are limitations to using `beamer`; check out the experimental [`ltx-talk` class](https://ctan.org/pkg/ltx-talk).

</details>

<details>

<summary>Is the Overleaf editor accessible?</summary>

Yes. As a web application, Overleaf leverages the accessibility features and functionality of modern web browsers which are regularly assessed by accessibility experts. Our latest completed [Voluntary Product Accessibility Template (VPAT)](https://www.overleaf.com/for/customers/vpat) shows conformance with Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.

</details>

<details>

<summary>Can PDFs produced by Overleaf satisfy the requirements of Title II of the Americans with Disability Act (ADA) and the harmonized European Standard for accessibility (EN 301 549)?</summary>

Yes. Legislation in the United States and Europe requires that PDFs meet WCAG 2.1 AA. To meet WCAG 2.1 AA, a PDF must be a tagged PDF. Support for tagging a PDF is provided in TeX Live 2025.

</details>

<details>

<summary>Can PDFs produced by Overleaf meet the PDF/UA-1 standard?</summary>

Yes. The LaTeX Project’s Tagging Project is specifically designed to produce the structural tags required by PDF/UA-1 (and the upcoming PDF/UA-2). If a user follows the LaTeX Project's current tagging recommendations, they are effectively building a document that is "PDF/UA-ready," which is the strongest way to meet the WCAG 2.1 AA legal mandate required by US and European legislation.

</details>

<details>

<summary>How do I switch my compiler to LuaLaTeX?</summary>

It's easy to switch to using LuaLaTeX, the LaTeX compilation engine that is recommended by the LaTeX tagging project team. While the default compiler in Overleaf is PDFLaTeX, you can [switch to LuaLaTeX in your project settings](https://docs.overleaf.com/getting-started/recompiling-your-project/selecting-a-tex-live-version-and-latex-compiler).

</details>

<details>

<summary>Where can I select the most recent version of TeX Live?</summary>

You can get the latest in [Overleaf Labs](https://www.overleaf.com/labs/participate), which provides access to the "rolling TeX Live" image in Overleaf, including the latest in PDF tagging support. This experimental TeX Live version is primarily for testing changes to TeX Live, packages, and previewing new accessibility features before they’re compiled into our annual TeX Live release.

Most PDF tagging features are available in the standard [TeX Live 2025](https://www.overleaf.com/blog/tex-live-2025-is-now-available) image.

</details>

[^1]: Automatic tagging is enabled.

[^2]: Tagging configuration is set.

[^3]: Image has alternative text.

[^4]: Image is an artifact.

[^5]: Image is a character.

[^6]: Table has one header row.

[^7]: Table is a presentation table.
